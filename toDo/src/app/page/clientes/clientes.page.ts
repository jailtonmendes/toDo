import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {

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
      header: 'Cadastrar cliente',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'NOME'
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF'
        },
        {
          name: 'telefone',
          type: 'text',
          placeholder: 'TELEFONE'
        },
        {
          name: 'cep',
          type: 'text',
          placeholder: 'CEP'
        },
        {
          name: 'rua',
          type: 'text',
          placeholder: 'RUA',
        },
        {
          name: 'cidade',
          type: 'text',
          placeholder: 'CIDADE',
        },
        {
          name: 'estado',
          type: 'text',
          placeholder: 'ESTADO',
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
            console.log(form);

            this.add(form.nome, form.cpf, form.telefone, form.cep, form.rua, form.cidade, form.estado )
          }
        }
      ]
    });

    await alert.present();
  }


  async add(nome: string, cpf: string, telefone: string, cep: string, rua: string, cidade: string, estado: string) {
    //VALIDA SE O USUÁRIO PREENCHEU O CAMPO
    if (nome.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message: 'Informe o que deseja fazer!',
        duration: 2000,
        position: 'top'
      });

      toast.present();
      return
    }

    let task = { name: nome, cpf: cpf, telefone: telefone, cep: cep, rua: rua, cidade: cidade, estado: estado };


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
