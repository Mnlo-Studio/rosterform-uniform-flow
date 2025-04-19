
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { teamName, email } = await req.json()
    
    if (!teamName) {
      return new Response(
        JSON.stringify({ error: 'Team name is required' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get auth user
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! }
        }
      }
    )
    const { data: { user } } = await supabaseAuth.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Generate slug using the database function
    const { data: slugData, error: slugError } = await supabaseClient.rpc(
      'generate_slug',
      { team_name: teamName }
    )

    if (slugError) throw slugError

    // Create form entry
    const { data, error } = await supabaseClient
      .from('public_forms')
      .insert({
        slug: slugData,
        team_name: teamName,
        email: email || null,
        user_id: user.id,
        form_title: `Order Form for ${teamName}`
      })
      .select('*')
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        success: true, 
        slug: data.slug,
        formId: data.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
