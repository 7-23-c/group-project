function Logger(error, type) {
	  if (type === 'info') {
		  return console.info(error);
	  } else if (type === 'log') {
		  return console.log(error);
    }else if (type === 'warn'){
      return console.warn(error);
    }else{
      return console.error("An error has occurred!");
    }
}

Logger("This is a test error", "info"); 
Logger("This is a test Message", "log");
Logger("This is a warning error", "warn");


  
  
  
  
  
  
  
  
  
  
