'use strict'
//https://xxxserver.herokuapp.com/
const config = {
    api:{
        base:'http://xxxserver.herokuapp.com/',
    },
    map:{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        timeout:8000,
    }
}

module.exports = config