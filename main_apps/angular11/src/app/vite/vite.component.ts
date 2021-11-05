import { Component, OnInit } from '@angular/core';
import config from '../../config';
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'

// @ts-ignore
// 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
window.eventCenterForAppNameVite = new EventCenterForMicroApp('appname-vite')

@Component({
  selector: 'app-vite',
  templateUrl: './vite.component.html',
  styleUrls: ['./vite.component.sass']
})
export class ViteComponent implements OnInit {

  constructor() { }

  url = `${config.vite}/child-vite/`

  microAppData = {msg: '来自基座的数据'}

  ngOnInit(): void {
  }

  /**
   * vite 子应用因为沙箱关闭，数据通信功能失效
   */
  handleCreate (): void {
    console.log('child-vite 创建了')
  }

  handleBeforeMount (): void {
    console.log('child-vite 即将被渲染')
  }

  handleMount (): void {
    console.log('child-vite 已经渲染完成')

    setTimeout(() => {
      this.microAppData = {msg: '来自基座的新数据'}
    }, 2000)
  }

  handleUnmount (): void {
    console.log('child-vite 卸载了')
  }

  handleError (): void {
    console.log('child-vite 加载出错了')
  }

  handleDataChange (e: CustomEvent): void {
    console.log('来自子应用 child-vite 的数据:', e.detail.data)
  }
}
