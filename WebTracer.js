function WebTracer() {

    // private:
    const _host_name = '{{host_name}}';
    const _prod_id = {{prod_id}};

    // public:
    this.traceAdv = function (message, user, sessionId, tag2 = null, tag3 = null) {
        fetch(_host_name + '/api/Trace', {method: 'POST', headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
            body: JSON.stringify({
                product: _prod_id,
                message: message,
                username: user,
                ticks: Date.now(),
                sessionId: sessionId,
                Tag1: 'JS',
                Tag2: tag2,
                Tag3: tag3,
            })
        });
    }

    this.trace = function (message, user) {
        fetch(_host_name + '/api/Trace', {method: 'POST', headers: {
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