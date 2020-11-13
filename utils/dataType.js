/**
 * Format data from cam
 * @param {Objece} props Information returned by cam
 */
export const formatData = (props) => {
  if (props.indexOf("BEGIN:VCARD") != -1) {
    /**
     * VCARD
     */
    return {
      type: "contact",
      icon: "user",
    };
  } else if (props.indexOf("tel:") != -1) {
    /**
     * TEL
     */
    return {
      type: "tel",
      icon: "phone",
    };
  } else if (props.indexOf("SMSTO:") != -1) {
    /**
     * SMS
     */
    return {
      type: "sms",
      icon: "message-square",
    };
  } else if (props.indexOf("MATMSG:") != -1) {
    /**
     * E-MAIL
     */
    return {
      type: "email",
      icon: "mail",
    };
  } else if (props.indexOf("geo:") != -1) {
    /**
     * LOCATION
     */
    return {
      type: "location",
      icon: "map-pin",
    };
  } else if (props.indexOf("WIFI:") != -1) {
    /**
     * WIFI
     */
    return {
      type: "wifi",
      icon: "wifi",
    };
  } else if (props.indexOf("https://wa.me") != -1) {
    /**
     * WHATSAPP
     */
    return {
      type: "whatsapp",
      icon: "message-circle",
    };
  } else if (props.indexOf("://") != -1) {
    /**
     * URL
     */
    return {
      type: "url",
      icon: "link",
    };
  } else {
    /**
     * TEXT
     */
    return {
      type: "text",
      icon: "file-text",
    };
  }
};
