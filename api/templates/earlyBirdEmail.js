// api/templates/earlyBirdEmail.js
// Brand-consistent, responsive email templates for Creatively Lensed Store Early Bird VIP registrations

export function generateEarlyBirdEmail({ name, email, spotNumber }) {
    const displayName = name ? name.trim() : 'Creator';
    const year = new Date().getFullYear();

    const subject = `✨ You're on the list — VIP Spot #${spotNumber} [Creatively Lensed Store]`;

    const text = `Hi ${displayName},

Thank you for registering for the Creatively Lensed Store early bird launch!

Your reservation is confirmed:
★ VIP SPOT #${spotNumber} RESERVED

What this means for you:
• 24-Hour Head Start: You will receive a private access link 24 hours prior to the public store drop.
• VIP Priority: Guaranteed priority access to upcoming cinematic LUTs, Lightroom presets, and video asset collections.
• Direct Updates: You'll be the first to preview test grades and sample packs before anyone else.

If you ever wish to be removed from the early access announcement list, simply reply to this email with "Unsubscribe" or email us at creativelensesstore@gmail.com.

Best regards,

Akshat Dange
Founder & Visual Artist • Creatively Lensed
Pune, Maharashtra, India
creativelensesstore@gmail.com
https://creativelylensed.com

© ${year} Creatively Lensed by Akshat Dange. All rights reserved.`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIP Access Confirmed — Creatively Lensed Store</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #050507; padding: 40px 15px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 480px; background-color: #0c0c10; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 32px 24px 18px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                            <div style="font-size: 13px; font-weight: 600; letter-spacing: 0.28em; color: #bfaea0; text-transform: uppercase;">
                                CREATIVELY LENSED
                            </div>
                            <div style="font-size: 10px; font-weight: 500; letter-spacing: 0.14em; color: rgba(255, 255, 255, 0.35); text-transform: uppercase; margin-top: 5px;">
                                STORE • EARLY BIRD VIP ACCESS
                            </div>
                        </td>
                    </tr>

                    <!-- Main Body -->
                    <tr>
                        <td style="padding: 30px 24px;">
                            <h1 style="font-size: 21px; font-weight: 600; color: #ffffff; margin: 0 0 14px 0; text-align: center;">
                                You're on the list, ${displayName}.
                            </h1>
                            <p style="font-size: 13px; line-height: 1.6; color: #8e8c9c; margin: 0 0 20px 0; text-align: center;">
                                Your early bird VIP registration for the Creatively Lensed Store has been recorded.
                            </p>

                            <!-- VIP Spot Badge -->
                            <div style="text-align: center; margin-bottom: 24px;">
                                <div style="display: inline-block; background: #131219; border: 1px solid rgba(223, 100, 110, 0.4); border-radius: 100px; padding: 7px 20px; color: #df646e; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">
                                    ★ VIP SPOT #${spotNumber} RESERVED
                                </div>
                            </div>

                            <!-- Early Bird Access Card -->
                            <div style="background: #121118; border: 1px dashed rgba(223, 100, 110, 0.45); border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 22px;">
                                <div style="font-size: 10px; font-weight: 600; letter-spacing: 0.16em; color: #df646e; text-transform: uppercase; margin-bottom: 5px;">
                                    Priority Status Confirmed
                                </div>
                                <div style="font-size: 16px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; margin-bottom: 4px;">
                                    EARLY ACCESS PRIVILEGE
                                </div>
                                <div style="font-size: 11px; color: #767484;">
                                    Cinematic LUTs • Lightroom Presets • Creator Video Assets
                                </div>
                            </div>

                            <!-- What to Expect -->
                            <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #dcd7d0; text-transform: uppercase; margin: 0 0 8px 0;">
                                What happens next:
                            </p>
                            <ul style="padding-left: 16px; margin: 0 0 22px 0; font-size: 12px; line-height: 1.7; color: #8e8c9c;">
                                <li><strong>24-Hour Head Start:</strong> Private access link sent to ${email} 24 hours prior to public drop.</li>
                                <li><strong>VIP Priority:</strong> Priority inventory on limited release preset packs and color suites.</li>
                                <li><strong>Behind-the-Scenes:</strong> Grading breakdowns and sample clip testing.</li>
                            </ul>

                            <!-- Founder Signature -->
                            <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 18px; margin-top: 18px;">
                                <p style="font-size: 13px; font-weight: 600; color: #ffffff; margin: 0 0 2px 0;">
                                    Akshat Dange
                                </p>
                                <p style="font-size: 11px; color: #6e6c7e; margin: 0; line-height: 1.5;">
                                    Founder &amp; Visual Artist • Creatively Lensed<br/>
                                    Pune, Maharashtra, India<br/>
                                    <a href="mailto:creativelensesstore@gmail.com" style="color: #df646e; text-decoration: none;">creativelensesstore@gmail.com</a>
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer & Privacy/Opt-Out Notice -->
                    <tr>
                        <td align="center" style="background-color: #07070a; padding: 18px 24px; font-size: 10px; color: #4e4c5b; line-height: 1.6; border-top: 1px solid rgba(255, 255, 255, 0.04);">
                            &copy; ${year} Creatively Lensed by Akshat Dange. All rights reserved.<br/>
                            You received this email because you opted in to store early access at <a href="https://creativelylensed.com/store" style="color: #6e6c7e; text-decoration: underline;">creativelylensed.com/store</a>.<br/>
                            To remove yourself from this list, reply to this email with "Unsubscribe".
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    return { subject, text, html };
}

export function generateOwnerNotification({ name, email, spotNumber, totalSubscribers, ip }) {
    const subject = `🔔 New VIP Waitlist Registration — Spot #${spotNumber} [${email}]`;
    const now = new Date();
    const formattedDate = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const text = `New waitlist registration!

Name: ${name || 'Not provided'}
Email: ${email}
Spot Number: #${spotNumber}
Registered At: ${now.toISOString()} (${formattedDate} IST)
Total Subscribers: ${totalSubscribers}
IP: ${ip}

— Creatively Lensed Store Waitlist System`;

    const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0c10; color: #fff; padding: 28px; border-radius: 16px; max-width: 460px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="margin: 0 0 8px 0; font-size: 17px; color: #df646e;">🔔 New Waitlist Registration</h2>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 14px 0;">
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Name:</strong> ${name || 'Not provided'}</p>
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Email:</strong> ${email}</p>
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Spot Number:</strong> #${spotNumber}</p>
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Registered At:</strong> ${formattedDate} IST</p>
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Total VIPs:</strong> ${totalSubscribers}</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 14px 0;">
        <p style="margin: 0; font-size: 11px; color: #4e4c5b;">Creatively Lensed Store • Waitlist Notification</p>
    </div>`;

    return { subject, text, html };
}

