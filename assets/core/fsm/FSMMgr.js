module.exports = {
    fsm: null,
    createFSM(){
        let _fsm = new StateMachine({
            init: 'down',
            transitions: [
                {name: 'jump', from: 'run', to: 'down'},
                {name: 'run', from: 'down', to: 'run'}
            ]
        });
        return _fsm;
    }
}