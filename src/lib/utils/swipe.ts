export class Swipe {
    callback: any;
    touches: any  = {
        "touchstart": {"x":-1, "y":-1},
        "touchmove" : {"x":-1, "y":-1},
        "touchend"  : false,
        "direction" : "undetermined"
    };

    constructor(elem: any, callback: any) { 
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        self.callback = callback;
    
        function handleEvent(e: any) {
            self.touchHandler(e);
        }
    
        elem.addEventListener('touchstart', handleEvent,  {passive: true});
        elem.addEventListener('touchmove', handleEvent,  {passive: true});
        elem.addEventListener('touchend', handleEvent,  {passive: true});
    }

    touchHandler (event: any) {
        let touch;
        if (typeof event !== 'undefined'){
            if (typeof event.touches !== 'undefined') {
                touch = event.touches[0];
                switch (event.type) {
                    case 'touchstart':
                    case 'touchmove':
                        this.touches[event.type].x = touch.pageX;
                        this.touches[event.type].y = touch.pageY;
                        break;
                    case 'touchend':
                        this.touches[event.type] = true;
                        // eslint-disable-next-line no-case-declarations
                        let x = (this.touches.touchstart.x - this.touches.touchmove.x),
                            y = (this.touches.touchstart.y - this.touches.touchmove.y);
                        if (x < 0) x /= -1;
                        if (y < 0) y /= -1;
                        if (x > y)
                            this.touches.direction = this.touches.touchstart.x < this.touches.touchmove.x ? "right" : "left";
                        else
                            this.touches.direction = this.touches.touchstart.y < this.touches.touchmove.y ? "down" : "up";
                        this.callback(event, this.touches.direction);
                        break;
                }
            }
        }
    };

}
