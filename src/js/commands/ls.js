import std from '../io/std';
import session from '../session';
import fs from '../fs'
import { join } from '../fs/helper';

export default {
    name: 'ls',
    description: "Lists directory contents of files and directories",
    exec: function (args) {
        const directory = ((args && args.length > 0) && args[0]) || join(session().currentLocation);
        const files = fs.list(directory);
        std.push(files.map(x=>x.name).join(' '));
    },

};