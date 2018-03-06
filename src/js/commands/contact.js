import std from '../io/std'

export default {
    name: 'contact',
    description: "Contact me!",
    exec: function (args) {
        return new Promise(function (resolve, reject) {
            std.clear();
            std.writeConsole('Please fill the form:');
            std.writeConsole('Valid contact method if want a reply :)');

            let contactData = {
                Name: null,
                Email: null,
                Message: null
            };

            let chain = new Promise(function (resolve) { resolve(); });

            let readWrap = function (chain, part, times) {
                return chain.then(function () {
                    return new Promise(function (resolve, reject) {
                        std.read(part)
                            .then(function (x) {
                                if (x.length === 0) {
                                    std.push('Input must not be empty: ' + part);
                                    return readWrap(chain, part, ++times);
                                }
                                std.push(part + ': ' + x);
                                contactData[part] = x;
                            })
                            .then(resolve);
                    });
                });
            };

            for (let part in contactData) {
                chain = readWrap(chain, part, 0);
            }

            return chain
                .then(function () {
                    //let action = "https://formspree.io/" + m + getSign() + m2 + m3;
                    let action = "https://hooks.zapier.com/hooks/catch/2191755/iits0w/";
                    let form = new FormData();
                    for (let i in contactData) {
                        form.append(i.toString().toLowerCase(), contactData[i]);
                    }
                    console.log('sending', form);
                    std.push('Sending... please wait.');
                    fetch(action, {
                        method: "POST",
                        body: form
                    })
                        .then(function (response) {
                            if (response.ok)
                                std.push('Thank you ' + contactData.Name + '! I will contact you as soon as possible.');
                            else {
                                console.error(response);
                                std.push('Ups! there was an error, please use the info command and send me an email.');

                            }
                        }).catch(function (error) {
                            console.error(error);
                            std.push('Ups! there was an error, please use the info command and send me an email.');
                        });

                })
                .then(resolve);
        });
    }
};