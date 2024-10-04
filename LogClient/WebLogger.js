function WebLogger() {

    // private:
    const _host_name = '{{host_name}}';
    const _prod_id = {{prod_id}};
    const _layer = 1; // front-end

    // public:
    this.log = function (message, user, isCritical = false) {
        fetch(_host_name, {method: 'POST', headers: {
            'Content-type': 'application/json; charset=UTF=8',
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
        }});
    }
}

window.Logger = new WebLogger();