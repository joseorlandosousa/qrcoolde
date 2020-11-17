
/**
 * Format data from cam
 * @param {Objece} props Information returned by cam
 */
export const formatData = (props) => {
  if (props.indexOf("BEGIN:VCARD") != -1) {
    /**
     * VCARD
     */
    return _formatContact(props);

  } else if (props.indexOf("tel:") != -1) {
    /**
     * TEL
     */
    return _formatPhone(props);

  } else if (props.indexOf("SMSTO:") != -1) {
    /**
     * SMS
     */
    return _formatSMS(props);

  } else if (props.indexOf("MATMSG:") != -1) {
    /**
     * E-MAIL
     */
    return _formatEmail(props);

  } else if (props.indexOf("geo:") != -1) {
    /**
     * LOCATION
     */
    return _formatLocation(props);

  } else if (props.indexOf("WIFI:") != -1) {
    /**
     * WIFI
     */
    return _formatWifi(props);

  } else if (props.indexOf("https://wa.me") != -1) {
    /**
     * WHATSAPP
     */
    return _formatWhatsApp(props);

  } else if (props.indexOf("://") != -1) {
    /**
     * URL
     */
    return _formatUrl(props);

  } else {
    /**
     * TEXT
     */
    return _formatText(props);

  }
};


/**
 * Format phone data
 * @param {String} props 
 */
const _formatPhone = (props) => {
  const phone = props.replace('TEL:', '');

  return {
    type: "phone",
    icon: "phone",
    content: [{
      contentType: "phone",
      label: null,
      content: phone
    }], 
    raw: props
  };

};

/**
 * Format SMS data
 * @param {String} props 
 */
const _formatSMS = (props) => {
  const data = props.replace('SMSTO:', '').split(':');
  const content = [];

  content.push({
    contentType: "phone",
    label: 'phone',
    content: data[0]
  });

  content.push({
    contentType: "message",
    label: null,
    content: data[1]
  });

  return {
    type: "sms",
    icon: "message-square",
    content, 
    raw: props
  };

};

/**
 * Format E-Mail data
 * MATMSG:TO:joseorlandosousa@gmail.com;SUB:Assunto;BODY:Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Não sou faixa preta cumpadi, sou preto inteiris, inteiris.;;
 * @param {String} props 
 */
const _formatEmail = (props) => {
  const content = [];

  content.push({
    contentType: "email",
    label: 'email',
    content:  /TO:(.*?);/g.exec(props)[1]
  });

  content.push({
    contentType: "text",
    label: 'subject',
    content: /SUB:(.*?);/g.exec(props)[1]
  });

  content.push({
    contentType: "message",
    label: null,
    content: /BODY:(.*?);/g.exec(props)[1]
  });

  return {
    type: "email",
    icon: "mail",
    content, 
    raw: props
  };

};

/**
 * Format Location data
 * @param {String} props 
 */
const _formatLocation = (props) => {
  const data = props.replace('geo:', '').split(',');
  const content = [];

  content.push({
    contentType: "number",
    label: 'latitude',
    content: data[0]
  });

  content.push({
    contentType: "number",
    label: 'longitude',
    content: data[1]
  });

  return {
    type: "location",
    icon: "map-pin",
    content, 
    raw: props
  };

};


/**
 * Format Wifi data
 * @param {String} props 
 */
const _formatWifi = (props) => {
  const content = [];
  content.push({
    contentType: "text",
    label: 'network',
    content: /S:(.*?);/g.exec(props)[1]
  });

  content.push({
    contentType: "text",
    label: 'password',
    content: /P:(.*?);/g.exec(props)[1]
  });

  content.push({
    contentType: "text",
    label: 'cript',
    content: /T:(.*?);/g.exec(props)[1]
  });

  

  return {
    type: "wifi",
    icon: "wifi",
    content, 
    raw: props
  };

};


/**
 * Format WhatsApp data
 * https://wa.me/5541987212120/?text=Mussum+Ipsum%2C+cacilds+vidis+litro+abertis.+Si+num+tem+leite+ent%C3%A3o+bota+uma+pinga+a%C3%AD+cumpadi%21+Vehicula+non.+Ut+sed+ex+eros.+Vivamus+sit+amet+nibh+non+tellus+tristique+interdum.+Em+p%C3%A9+sem+cair%2C+deitado+sem+dormir%2C+sentado+sem+cochilar+e+fazendo+pose.%0A.
 * @param {String} props 
 */
const _formatWhatsApp = (props) => {
  const content = [];

  content.push({
    contentType: "phone",
    label: 'phone',
    content: /wa.me\/(.*?)\//g.exec(props)[1]
  });

  content.push({
    contentType: "message",
    label: null,
    content: decodeURIComponent(/text=?(.*)/g.exec(props)[1]).replace(/\+/g, ' ')
  });
  

  return {
    type: "whatsapp",
    icon: "message-circle",
    content, 
    raw: props
  };

};

/**
 * Format url data
 * @param {String} props 
 */
const _formatUrl = (props) => {
  const url = props.replace('URL:', '');

  const content = [];
  content.push({
    contentType: "text",
    label: null,
    content: url
  });

  return {
    type: "url",
    icon: "link",
    content: content, 
    raw: props
  };

};

/**
 * 
 */
/**
 * Format text data
 * @param {String} props 
 */
const _formatText = (props) => {
  const content = [];
  content.push({
    contentType: "message",
    label: null,
    content: props
  });

  return {
    type: "text",
    icon: "file-text",
    content: content, 
    raw: props
  };

};



/**
 * Format Contact data
 * BEGIN:VCARD
VERSION:4.0
N;CHARSET=utf-8;ENCODING=8BIT:Sousa;José Orlando
FN;CHARSET=utf-8;ENCODING=8BIT:José Orlando Sousa
ORG;CHARSET=utf-8;ENCODING=8BIT:Freella
TITLE;CHARSET=utf-8;ENCODING=8BIT:Pé rapado
TEL;HOME;VOICE:41987212120
TEL;TYPE=CELL:41987212120
TEL;TYPE=FAX:
ADR;TYPE=work:Av Visconde de Guarapuava, 3185;Curitiba;80010-100;PR
EMAIL:joseorlandosousa@gmail.com
URL:http://freella.com
END:VCARD
 * @param {String} props 
 */
const _formatContact = (props) => {
  const content = [];
  content.push({
    contentType: "text",
    label: 'name',
    content: /FN;CHARSET=utf-8;ENCODING=8BIT:?(.*)/g.exec(props)[1]
  });

  const email = /EMAIL:?(.*)/g.exec(props)[1];
  if(!!email)
  content.push({
    contentType: "text",
    label: 'email',
    content: email
  });

 

  const phone = /TEL;HOME;VOICE:?(.*)/g.exec(props)[1];
  if(!!phone)
  content.push({
    contentType: "phone",
    label: 'phone',
    content: phone
  });

  const cel = /TEL;TYPE=CELL:?(.*)/g.exec(props)[1];
  if(!!cel)
  content.push({
    contentType: "phone",
    label: 'cel',
    content: cel
  });
  

  const org = /ORG;CHARSET=utf-8;ENCODING=8BIT:?(.*)/g.exec(props)[1];
  if(!!org)
  content.push({
    contentType: "text",
    label: 'org',
    content: org
  });

  const addr = /ADR;TYPE=work:?(.*)/g.exec(props)[1];
  if(!!addr)
  content.push({
    contentType: "message",
    label: null,
    content: addr
  });
  
  const url = /URL:?(.*)/g.exec(props)[1];
  if(!!url)
  content.push({
    contentType: "text",
    label: 'url',
    content: url
  });

  return {
    type: "contact",
    icon: "user",
    content, 
    raw: props
  };

};
