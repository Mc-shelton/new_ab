import node_events from 'node:events'
import ping_event from './pings.sub'
class IEvents extends node_events{
    constructor(){
        super()
    }
}
export default IEvents
