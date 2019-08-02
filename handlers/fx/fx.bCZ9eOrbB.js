const normalizeIt = (gates, station, desiredGates) => {
  let retorno = null;
  let normalizedGates = {};

  desiredGates.map((dg) => {
    const gate = gates.filter(x => x.name === dg)[0];
    const { payload } = gate;
    
    if (payload.type === 'body') {
      
      
      const bodyContent = JSON.stringify(payload.content).replace(/\<placeholder\>/gim, station);

      const objBody = {};
      objBody[dg] = JSON.parse(bodyContent);


      const obj = {};
      obj[dg] = {};
      obj[dg].body = JSON.parse(bodyContent); // objBody;
      obj[dg].url = gate.host;
      
      normalizedGates = Object.assign({}, normalizedGates, obj);
    } 
    else if(payload.type === 'url') {

      const contentUrl = payload.content.replace(/\<placeholder\>/gim, station.toLowerCase());
  
      const obj = {};
      obj[dg] = {};
      
      obj[dg].url = `${gate.host}${contentUrl}`;
      obj[dg].body = null;

      normalizedGates = Object.assign({}, normalizedGates, obj);

    }
    
  });
  
  if (Object.entries(normalizedGates).length !== 0) {
    retorno = normalizedGates;
  }
  
  return retorno;
  
};

module.exports.exchangewebsockets = normalizeIt;
