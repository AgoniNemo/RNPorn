'use strict'

const config = {
    api:{
        base:'https://xxxserver.herokuapp.com/',
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