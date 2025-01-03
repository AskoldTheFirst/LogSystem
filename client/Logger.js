function WebLogger() {

    // private:
     const _host_name = 'http://46.238.2.128:83';
    //const _host_name = 'http://localhost:5009';
    const _prod_id = 4;
    const _layer = 1; // front-end
  
    // public:
    this.log = function (message, user, isCritical = false) {
      fetch(_host_name + '/api/log', {
        method: 'POST', headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          product: _prod_id,
          severity: isCritical ? 3 : 1,
          dt: '',
          message: message,
          username: user,
          RequestCtx: '',
          EnvironmentCtx: '',
          Browser: '',
          Exception: '',
          LayerType: _layer,
          Tag1: 'JS',
          Tag2: '',
          Tag3: '',
        })
      });
    }
  }
  window.Logger = new WebLogger();
  
  function WebTracer() {
  
      // private:
      const _host_name = 'http://46.238.2.128:83';
      //const _host_name = 'http://localhost:5009';
      const _prod_id = 4;
  
      // public:
      this.traceAdv = function (message, user, sessionId, tag2 = null, tag3 = null) {
        fetch(_host_name + '/api/trace', {
          method: 'POST', headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            product: _prod_id,
            message: message,
            username: user,
            ticks: Date.now() * 10000, // to transform from milliseconds to ticks.
            sessionId: sessionId,
            Tag1: 'JS',
            Tag2: tag2,
            Tag3: tag3,
          })
        });
      }
  
      this.trace = function (message, user) {
        fetch(_host_name + '/api/trace', {
          method: 'POST', headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            product: _prod_id,
            message: message,
            username: user,
            ticks: null,
            sessionId: null,
            Tag1: 'JS',
            Tag2: null,
            Tag3: null,
          })
        });
      }
    }
    window.Tracer = new WebTracer();