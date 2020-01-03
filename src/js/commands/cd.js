import std from '../io/std';
import fs from '../fs';
import session from '../session'

export default {
    name: 'cd',
    description: "Change the current directory to the specified by the argument",
    exec: function (args) {
        let { currentLocation } = session();
        const dir = args[0];

        if (dir === '.') {
            return;
        }
        else if (dir === '..') {
            currentLocation.pop();
        }
        else {
            //TODO: Validate
            currentLocation.push(dir)
        }
        session({
            currentLocation: currentLocation
        })
    },

};