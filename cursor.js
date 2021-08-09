AFRAME.registerComponent('cursor-listener',{
    schema:{
        selectedItemsId:{type:'string',default:''}
    },
    init:function(){
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
    },
    update:function(){
        const fadeBackgroundEl = document.querySelector('#fadeBackground');
        c = fadeBackgroundEl.children;
        if(c.length>0){
            var i;
            for(i=0;i<=c.length;i++){
                fadeBackgroundEl.removeChild(c[i]);
            }
        }else{
            this.handleMouseClickEvents()
        }
    },
    handlePlacesListState:function(){
        const id = this.el.getAttribute('id')
        const postersId = ['spiderman','justiceliague','superman','avengers']
        if(postersId.includes(id)){
            const posterContainer = document.querySelector('#poster-container')
            posterContainer.setAttribute('cursor-listener',{
                selectedItemsId:id
            })
            this.el.setAttribute('material',{color:'orange',opacity:1})
        }
    },
    handleMouseEnterEvents:function(){
        this.el.addEventListener('mouseenter',()=>{
            this.handlePlacesListState()
        })
    },
    handleMouseLeaveEvents:function(){
        this.el.addEventListener('mouseleave',()=>{
            const {selectedItemsId} = this.data
            if(selectedItemsId){
                const element = document.querySelector(`#${selectedItemsId}`)
                const id = element.getAttribute('id')
                if(id == selectedItemsId){
                    element.setAttribute('material',{
                        color:'white',opacity:1
                    })
                }
            }
        })
    },
    handleMouseClickEvents:function(){
        this.el.addEventListener('click',()=>{
            const {selectedItemsId} = this.data
            const fadeBackgroundEl = document.querySelector('#fadeBackground')
            const cursorEl = document.querySelector('#camera-cursor')
            const titleEl = document.querySelector('#title')
            if(selectedItemsId){
                fadeBackgroundEl.setAttribute('visible',true)
                fadeBackgroundEl.setAttribute('info-banner',{
                    itemsId:selectedItemsId
                })
                titleEl.setAttribute('visible',false)
                cursorEl.setAttribute('position',{x:0,y:0,z:-1})
                cursorEl.setAttribute('geometry',{
                    radiusInner:0.03,
                    radiusOuter:0.04
                })
            }else{
                fadeBackgroundEl.setAttribute('visible',false)
                titleEl.setAttribute('visible',true)
                cursorEl.setAttribute('position',{x:0,y:0,z:-3})
                cursorEl.setAttribute('geometry',{
                    radiusInner:0.02,
                    radiusOuter:0.03
                })
            }
        })
    }
})
