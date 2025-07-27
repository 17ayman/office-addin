function get_template_A_str(user_info) {
  let str = "";

  if (is_valid_data(user_info.greeting)) {
    str += user_info.greeting + "<br/>";
  }

  str += "<table cellpadding='0' cellspacing='0' style='font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; width: 600px;'>";
  str += "  <tr>";
  str += "    <td style='vertical-align: middle; padding-right: 20px;'>";

  // Name
  str += "      <div style='font-size: 16px; font-weight: bold; color: #222;'>" + user_info.displayName + "</div>";

  // Title (Optional)
  str += is_valid_data(user_info.title)
    ? "      <div style='font-size: 13px; color: #666;'>" + user_info.title + " | Edama, KSA.</div>"
    : "";

  str += "      <br>";

  // Email
  if (is_valid_data(user_info.email)) {
    str += "      <div style='margin-bottom: 6px;'>";
    str += "        <img src='https://i.imgur.com/3qA3vEr.png' alt='Email' style='height: 12px; vertical-align: middle; margin-right: 6px;'>";
    str += "        <a href='mailto:" + user_info.email + "' style='color: #0DA57C; text-decoration: none;'>" + user_info.email + "</a>";
    str += "      </div>";
