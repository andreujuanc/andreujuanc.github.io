const session = {
    currentLocation: ['/', 'home', 'guest'],
    currentUser: 'guest',
    hostname: 'andr.eu'
}

export default function () {
    if (arguments && arguments.length > 0) {
        const args = arguments[0];
        Object.keys(args).forEach(x => {
            session[x] = args[x];
        })
    }
    return {
        currentLocation: session.currentLocation,
        currentUser: session.currentUser,
        hostname: session.hostname
    }
}