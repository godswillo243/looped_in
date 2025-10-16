export const signUpEmailTemplate = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color:#f9f9f9; margin:0; padding:0;">
    <div style="max-width:600px; margin:40px auto; background:white; border-radius:10px; padding:30px;">
      <h2 style="color:#2c3e50;">Welcome to LoopedIn!</h2>
      <p style="font-size:16px; color:#555;">
        Hi {{name}},<br><br>
        We're thrilled to have you on board. You can now explore features, connect with others, and get the most out of LoopedIn.
      </p>
      <p>Your verification code is {{code}}</p>
      <p style="margin-top:30px; font-size:14px; color:#999;">
        Cheers,<br>The LoopedIn Team
      </p>
    </div>
  </body>
</html>
`;
