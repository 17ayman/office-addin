// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function get_template_A_str(user_info)
{
  let str = "";
  if (is_valid_data(user_info.greeting))
  {
    str += user_info.greeting + "<br/>";
  }


str += "<table cellpadding='0' cellspacing='0' style='font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; width: 600px;'>";
str += "  <tr>";
str += "    <td style='vertical-align: middle; padding-right: 20px;'>";
str += "      <div style='font-size: 16px; font-weight: bold; color: #222;'>" + user_info.displayName + "</div>";
str += "      <div style='font-size: 13px; color: #666;'>" + user_info.title + " | Edama, KSA.</div>";
str += "      <br>";
str += "      <div style='margin-bottom: 6px;'>";
str += "        <img src='https://i.imgur.com/3qA3vEr.png' alt='Email' style='height: 12px; vertical-align: middle; margin-right: 6px;'>";
str += "        <a href='mailto:" + user_info.email + "' style='color: #0DA57C; text-decoration: none;'>" + user_info.email + "</a>";
str += "      </div>";
str += "      <div style='margin-bottom: 6px;'>";
str += "        <img src='https://i.imgur.com/BzsOBHT.png' alt='Website' style='height: 16px; vertical-align: middle; margin-right: 6px;'>";
str += "        <a href='https://www.edamasolutions.com' style='color: #0DA57C; text-decoration: none;'>www.edamasolutions.com</a>";
str += "      </div>";
str += "      <div>";
str += "        <img src='https://i.imgur.com/T20jsOf.png' alt='Phone' style='height: 16px; vertical-align: middle; margin-right: 6px;'>";
str += "        <a href='tel:" + user_info.mobilePhone + "' style='color: #0DA57C; text-decoration: none;'>" + user_info.mobilePhone + "</a>";
str += "      </div>";
str += "    </td>";
str += "    <td style='width: 3px; background-color: #0DA57C;'>&nbsp;</td>";
str += "    <td style='vertical-align: middle; padding-left: 20px;'>";
str += "      <img src='https://i.imgur.com/IcG7VHR.png' alt='Edama Logo' style='height: 120px;'>";
str += "    </td>";
str += "  </tr>";
str += "</table>";


  return str;
}

function get_template_B_str(user_info)
{
  let str = "";
  if (is_valid_data(user_info.greeting))
  {
    str += user_info.greeting + "<br/>";
  }

  str += "<table>";
  str +=   "<tr>";
  str +=     "<td style='border-right: 1px solid #000000; padding-right: 5px;'><img src='https://raw.githubusercontent.com/17ayman/office-addin/refs/heads/Eda/EdamaEmailLogo2.png' alt='Logo' /></td>";
  str +=     "<td style='padding-left: 5px;'>";
  str +=	   "<strong>" + user_info.name + "</strong>";
  str +=     is_valid_data(user_info.pronoun) ? "&nbsp;" + user_info.pronoun : "";
  str +=     "<br/>";
  str +=	   user_info.email + "<br/>";
  str +=	   is_valid_data(user_info.phone) ? user_info.phone + "<br/>" : "";
  str +=     "</td>";
  str +=   "</tr>";
  str += "</table>";

  return str;
}

function get_template_C_str(user_info)
{
  let str = "";
  if (is_valid_data(user_info.greeting))
  {
    str += user_info.greeting + "<br/>";
  }

  str += user_info.name;
  
  return str;
}
