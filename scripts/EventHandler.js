import Emitter from 'component-emitter';

export default class EventHandler {
    static emitter = new Emitter();

    static emit(event) {
        var args = [].slice.call(arguments, 1);

        console.log('Event emitted:', event);

        this.emitter.emit(event, args);
    }

    static on(event, callback) {
        this.emitter.on(event, callback);
    }
}