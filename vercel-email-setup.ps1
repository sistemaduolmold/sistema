# DUOMOLD Vercel + Resend setup
# Run this from the project root if you use the Vercel CLI.

Write-Host "1. Login to Vercel"
Write-Host "   vercel login"

Write-Host ""
Write-Host "2. Link this folder to the Vercel project"
Write-Host "   vercel link"

Write-Host ""
Write-Host "3. Add environment variables"
Write-Host "   vercel env add RESEND_API_KEY production"
Write-Host "   vercel env add EMAIL_FROM production"
Write-Host "   vercel env add SUPABASE_URL production"
Write-Host "   vercel env add SUPABASE_SERVICE_ROLE_KEY production"
Write-Host "   vercel env add RESEND_API_KEY preview"
Write-Host "   vercel env add EMAIL_FROM preview"
Write-Host "   vercel env add SUPABASE_URL preview"
Write-Host "   vercel env add SUPABASE_SERVICE_ROLE_KEY preview"
Write-Host "   vercel env add EMAIL_TEST_TO preview"

Write-Host ""
Write-Host "4. Deploy"
Write-Host "   vercel --prod"

Write-Host ""
Write-Host "Notes:"
Write-Host "- RESEND_API_KEY is your secret Resend API key."
Write-Host "- EMAIL_FROM should be a verified sender like DUOMOLD <noreply@your-domain.pt>."
Write-Host "- EMAIL_TEST_TO can be your own email for preview testing without a custom domain."
Write-Host "- SUPABASE_URL is the project URL and SUPABASE_SERVICE_ROLE_KEY is a server-only secret used to attach private payslips."
Write-Host "- Never place SUPABASE_SERVICE_ROLE_KEY in supabase-config.js or other browser files."
Write-Host "- Make sure your domain DNS has SPF/DKIM configured in Resend."
Write-Host "- The app calls /api/send-notification-email on Vercel."
Write-Host "- Payslip emails call /api/send-payslips on Vercel."
