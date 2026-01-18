import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, companyName, serviceInterest, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !serviceInterest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get current date and time
    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Nexolance Website <onboarding@resend.dev>', // You'll update this with your domain
      to: ['info@nexolance.agency'],
      subject: 'New Lead Submission - Nexolance',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .section {
                background: white;
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 8px;
                border-left: 4px solid #10B981;
              }
              .section h2 {
                color: #10B981;
                font-size: 16px;
                margin: 0 0 15px 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .field {
                margin-bottom: 12px;
              }
              .field-label {
                font-weight: 600;
                color: #6b7280;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .field-value {
                color: #111827;
                font-size: 16px;
                margin-top: 4px;
              }
              .message-box {
                background: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                margin-top: 8px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 12px;
              }
              .timestamp {
                background: #fef3c7;
                padding: 10px 15px;
                border-radius: 6px;
                text-align: center;
                margin-top: 15px;
                font-size: 14px;
                color: #92400e;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🚀 New Lead from Nexolance Website</h1>
            </div>

            <div class="content">
              <div class="section">
                <h2>👤 Contact Information</h2>
                <div class="field">
                  <div class="field-label">Full Name</div>
                  <div class="field-value">${fullName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Phone Number</div>
                  <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ${companyName ? `
                <div class="field">
                  <div class="field-label">Company Name</div>
                  <div class="field-value">${companyName}</div>
                </div>
                ` : ''}
              </div>

              <div class="section">
                <h2>💼 Service Interest</h2>
                <div class="field-value">${serviceInterest}</div>
              </div>

              ${message ? `
              <div class="section">
                <h2>📝 Project Details</h2>
                <div class="message-box">${message}</div>
              </div>
              ` : ''}

              <div class="timestamp">
                ⏰ Submitted: ${submittedAt}
              </div>

              <div class="footer">
                <p>This lead was submitted through the Nexolance website contact form.</p>
                <p style="margin-top: 10px;">
                  <strong>Quick Actions:</strong><br>
                  <a href="mailto:${email}" style="color: #10B981; text-decoration: none;">Reply to Email</a> |
                  <a href="tel:${phone}" style="color: #10B981; text-decoration: none;">Call Now</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
