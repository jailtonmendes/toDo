import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private actionSheetController: ActionSheetController) {
    let taskjson = localStorage.getItem('taskDb');

    if (taskjson!=null) {
      this.tasks = JSON.parse(taskjson) //Transformar String em Objeto JavaScript - JSON
    }
  }


  async showAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'red',
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'O que deseja fazer'
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form.newTask);

            this.add(form.newTask)
          }
        }
      ]
    });

    await alert.present();
  }


  async add(newTask: string) {
    if (newTask.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message: 'Informe o que deseja fazer!',
        duration: 2000,
        position: 'top'
      });

      toast.present();
      return
    }

    let task = { name: newTask, done: false };

    this.tasks.push(task);

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tasks)); //JSON.stringfy(this.tasks) TRANSFORMA OBJETO EM TEXTO
  }



  async openActions(task : any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'O QUE DESEJA FAZER?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        // icon: 'trash',
        handler: () => {
          task.done = !task.done;
          this.updateLocalStorage();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();

}

delete(task : any) {
  this.tasks = this.tasks.filter(taskArray => task != taskArray)

  this.updateLocalStorage();
}

}
