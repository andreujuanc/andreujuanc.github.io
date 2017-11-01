import std from '../io/std'

export default {
    name: 'echo', 
    description: "Displays message", 
    exec: function (args) { 
        std.push(args.join(' ')); 
    }
};