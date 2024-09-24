function WebLogger() {

    // private:
    const _host_name = '{{host_name}}';
    const _prod_name = {{prod_name}};
    const _layer = 1; // front-end

    // public:
    this.log = function (message, user, isCritical = false) {
        fetch(_host_name, {method: 'POST', headers: {
            'Content-type': 'application/json; charset=UTF=8',
            body: JSON.stringify({
                Message: message,

            })
        }});
    }
}

window.Logger = new WebLogger();