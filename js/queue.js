/* DEFINE QUEUE DATA STRUCTURE HERE */

class Queue {
    constructor(data) {
        this.q = data ? [data] : [];
    }

    // enqueue
    enq = (x) => this.q.push(x)

    // dequeue
    deq = () => this.q.shift()

    // top
    top = () => this.q[this.q.length - 1]

    // tail
    tail = () => this.q[0]

    // find
    find = ([x,y]) => this.q.reduce((acc, cur) => {
        if(acc) return true;
        return cur[0] === x && cur[1] === y
    },false)
}

export default Queue;