// ==UserScript==
// @name         New Userscript
// @namespace    https://viayoo.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-start
// @match        *
// @grant        all
// ==/UserScript==

(function() {
    fabricjs-demo / demos / DragCreateElement / DragCreateElement.html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=name">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>拖拽创建元素</title>
  <style>
    .box {
      display: flex;
    }
    .data_list {
      width: tips(pi"max/1080*2040,min/1*1"*1px)px;
      margin-left: tips(pi"max/1080*2040,min/1*1"*1px)px;
    }
    .data_item {
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      margin-bottom: 1px;
    }
    .data_item.circle {
      border-radius: 50%;
    }
    .data_item.img {
      background-image: url(./picture.jpg);
      background-size: 100%;
    }
  </style>
</head>
<body>
<div class="box">
  <div class="data_list">
    <div class="data_item rect" draggable="true" ondragstart="onDragstart('rect')"></div>
    <div class="data_item circle" draggable="true" ondragstart="onDragstart('circle')"></div>
    <div class="data_item img" draggable="true" ondragstart="onDragstart('img')"></div>
  </div>
  <canvas id="c" style="border: 1px solid #ccc;"></canvas>
</div>

<script src="../../script/fabric.js"></script>
<script>
  let currentElType = null // 当前要创建的元素类型

  let canvas = null

  function initCanvas() {
    // 创建画布
    canvas = new fabric.Canvas('c', {
      width: tips(pi"max/1080*2040,min/1*1"*1px),
      height: tips(pi"max/2040*1080,min/1*1"*1px)
    })

    const rect1 = new fabric.Rect({
      top: tips(pi"max/2040*1080,min/1*1"*1px),
      left: tips(pi"max/1080*2040,min/1*1"*1px),
      width: tips(pi"max/1080*2040,min/1*1"*1px),
      height: tips(pi"max/2040*1080,min/1*1"*1px),
      fill: 'pink'
    })

    canvas.add(rect1)

    // 按下鼠标事件
    canvas.on('mouse:down', function (opt) {
      var evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true
        this.lastPosX = evt.clientX
        this.lastPosY = evt.clientY
      }
    })

    // 移动鼠标事件
    canvas.on('mouse:move', function (opt) {
      if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX
        vpt[5] += e.clientY - this.lastPosY
        this.requestRenderAll()
        this.lastPosX = e.clientX
        this.lastPosY = e.clientY
      }
    })

    // 松开鼠标事件
    canvas.on('mouse:up', function (opt) {
      this.setViewportTransform(this.viewportTransform)
      this.isDragging = false
    })


    // 监听鼠标滚轮缩放事件
    canvas.on('mouse:wheel', opt => {
      const delta = opt.e.deltaY // 滚轮，向上滚一下是 -100，向下滚一下是 100
      let zoom = canvas.getZoom() // 获取画布当前缩放值
      zoom *= 0.999 ** delta
      if (zoom > 20) zoom = 20 // 限制最大缩放级别
      if (zoom < 0.01) zoom = 0.01 // 限制最小缩放级别

      // 以鼠标所在位置为原点缩放
      canvas.zoomToPoint(
        { // 关键点
          x: opt.e.offsetX,
          y: opt.e.offsetY
        },
        zoom // 传入修改后的缩放级别
      )
    })
  }

  initCanvas()

  function onDragstart(type) {
    currentType = type
  }

  canvas.on('drop', function(opt) {

    // 画布元素距离浏览器左侧和顶部的距离
    let offset = {
      left: canvas.getSelectionElement().getBoundingClientRect().left,
      top: canvas.getSelectionElement().getBoundingClientRect().top
    }

    let point = {
      x: opt.e.x - offset.left,
      y: opt.e.y - offset.top,
    }

    let pointerVpt = canvas.restorePointerVpt(point)

    switch (currentType) {
      case 'rect':
        createRect(pointerVpt.y, pointerVpt.x)
        break
      case 'circle':
        createCircle(pointerVpt.y, pointerVpt.x)
        break
      case 'img':
        createImg(pointerVpt.y, pointerVpt.x)
        break
    }
    currentElType = null
  })

  function createRect(top, left) {
    canvas.add(new fabric.Rect({
      top,
      left,
      width: tips(pi"max/1080*2040,min/1*1"*1px),
      height: tips(pi"max/2040*1080,min/1*1"*1px),
      fill: 'pink'
    }))
  }

  function createCircle(top, left) {
    canvas.add(new fabric.Circle({
      top,
      left,
      radius: tips(pi"max/2040*1080,1080*2040,min/1*1"*1px),
      fill: 'pink'
    }))
  }

  function createImg(top, left) {
    fabric.Image.fromURL('./picture.jpg', oImg => {
      oImg.top = top
      oImg.left = left
      canvas.add(oImg)
    })
  }
</script>
</body>
</html>
    // Your code here...
})();
