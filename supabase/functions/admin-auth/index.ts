import { createClient } from 'npm:@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, password, action } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (action === 'login') {
      if (email === 'admin@workspace.com' && password === 'Admin@123') {
        const { data: admin, error } = await supabase
          .from('admin_users')
          .select('id, email, full_name, is_active')
          .eq('email', email)
          .eq('is_active', true)
          .maybeSingle();

        if (error || !admin) {
          return new Response(
            JSON.stringify({ error: 'Invalid credentials' }),
            {
              status: 401,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        const token = btoa(JSON.stringify({ id: admin.id, email: admin.email, exp: Date.now() + 86400000 }));

        return new Response(
          JSON.stringify({
            success: true,
            admin: {
              id: admin.id,
              email: admin.email,
              full_name: admin.full_name,
            },
            token,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ error: 'Invalid credentials' }),
          {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    if (action === 'verify') {
      const token = req.headers.get('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return new Response(
          JSON.stringify({ error: 'No token provided' }),
          {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      try {
        const payload = JSON.parse(atob(token));
        if (payload.exp < Date.now()) {
          return new Response(
            JSON.stringify({ error: 'Token expired' }),
            {
              status: 401,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        const { data: admin } = await supabase
          .from('admin_users')
          .select('id, email, full_name, is_active')
          .eq('id', payload.id)
          .eq('is_active', true)
          .maybeSingle();

        if (!admin) {
          return new Response(
            JSON.stringify({ error: 'Invalid token' }),
            {
              status: 401,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        return new Response(
          JSON.stringify({ success: true, admin }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch {
        return new Response(
          JSON.stringify({ error: 'Invalid token' }),
          {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});