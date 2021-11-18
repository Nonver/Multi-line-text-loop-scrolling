Component({
  properties: {
    // 这里定义了data属性，属性值可以在组件使用时指定
    data: {
      type: Array,
      value: [],
    },
    showNum:{
      type: String,
      value: 5,
    },
    lineHeight:{
      type: String,
      value: 60,
    },
    animation:{
      type: String,
      value: 2000,
    }
  },
  data: {
    showdata: [], //循环数据 渲染的时候使用
		marginTop: 0, //滚动的高度 相当于一行
		showLine: 0, //固定0
    animationScroll: 800,//marginTop计算不用理
    maoScroll:0, //maoScroll-main高度，自动计算不用理会
  },
  attached: function () {
    this.init()
  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  methods: {
    init: function(){
      let dataList = []
      this.data.showLine = this.data.showNum < this.data.data.length ? this.data.showNum : this.data.data.length;
      for(let i = 0; i < this.data.data.length; i++){
        dataList.push(this.data.data[i].name) 
      }
      for(let i = 0; i < this.data.showLine; i++){
        dataList.push(this.data.data[i].name) 
      }
      this.setData({
        showdata:dataList,
        maoScroll:this.data.lineHeight*this.data.showNum
      })
      var that = this
      setInterval(function(){
        that.animationFunc(that)
      }, this.data.animation);
    },
    animationFunc: function(that){
      console.log(that.data.animation)
      if(this.data.marginTop >= this.data.data.length*this.data.lineHeight){
        this.setData({
          marginTop: 0
        })
      }
      let stepTime = this.data.animationScroll/this.data.lineHeight;
      var step = 0;
      let self = this;
      var index = setInterval(function(){
        self.setData({
          marginTop: self.data.marginTop + 1
        })
        step++;
        if (step >= self.data.lineHeight) {
          clearInterval(index);
        }
      }, stepTime);
    },
  }
})