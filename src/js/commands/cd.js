import std from '../io/std';
import fs from '../fs';
import session from '../session'

export default {
    name: 'cd',
    description: "Change the current directory to the specified by the argument", 
    exec: function (args) { 
        let { currentLocation }  = session();
        
        currentLocation.push(args[0])
        session({
            currentLocation: currentLocation
        })
    },
    
};