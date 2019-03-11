import std from '../io/std';
import session from '../session';
import fs from '../fs'

export default {
    name: 'ls',
    description: "Lists directory contents of files and directories",
    exec: function (args) {
        const directory = ((args && args.length > 0) && args[0]) || session().currentLocation.join('/');
        const files = fs.list(directory);
        std.push(files.map(x=>x.name).join(' '));
    },

};