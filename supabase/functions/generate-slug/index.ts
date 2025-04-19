
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
          headers: {
            Authorization: req.headers.get('Authorization')!,
          },
        },
      }
    )

    const { data: { user } } = await supabaseAuth.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const { teamName, email } = await req.json()
    
    if (!teamName) {
      return new Response(
        JSON.stringify({ error: 'Team name is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Generate slug from team name
    const slug = await generateSlug(supabaseClient, teamName)
    
    // Check if a form with this team name already exists
    const { data: existingForm } = await supabaseClient
      .from('public_forms')
      .select('*')
      .eq('team_name', teamName)
      .eq('user_id', user.id)
      .maybeSingle()
    
    if (existingForm) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          slug: existingForm.slug,
          message: 'Form already exists',
          formId: existingForm.id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Create new form entry
    const { data, error } = await supabaseClient
      .from('public_forms')
      .insert({
        slug,
        team_name: teamName,
        email: email || null,
        user_id: user.id,
        form_title: `Order Form for ${teamName}`
      })
      .select()
      .single()
    
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        slug: slug,
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

async function generateSlug(supabase, teamName) {
  // Generate base slug from team name (lowercase, spaces to dashes, remove special chars)
  let baseSlug = teamName.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  // Check if slug exists
  let slug = baseSlug
  let counter = 0
  let exists = true
  
  while (exists && counter < 100) {
    const { data, error } = await supabase
      .from('public_forms')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle()
    
    if (!data) {
      exists = false
    } else {
      counter++
      slug = `${baseSlug}-${counter}`
    }
  }
  
  return slug
}
