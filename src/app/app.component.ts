import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { ApplicationRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval, Subscription } from 'rxjs';
import { IndexdbService } from './service/indexdb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-pwa';
  apiData: any;

  isNewVersionAvailable: boolean = false;
  intervalSource = interval(10000); // interval(15 * 60 * 1000); // every 15 mins
  intervalSubscription: Subscription | undefined;


  indexedDBService = inject(IndexdbService)
  private readonly publicKey: string = 'BKdlkDHfRotf8VRSuGDIQi2QzmTlDm5q1F-bgqUgrWN00nnZWOHJjZim863mKH-oHV-XqbpsjdERTqz_elNbabo';
  constructor(
    private swUpdate: SwUpdate,
    private zone: NgZone,
    private swPush: SwPush,
    private http: HttpClient,

  ) {
    this.checkForUpdate();
  }
  ngOnInit() {
    this.pushSubscription();

    // Subscribe to incoming messages
    this.swPush.messages.subscribe((message) => {
      console.log({message});
      // Display message content in a popup window
      const popup = window.open('', '_blank', 'width=400,height=300');
      console.log("popup",popup)
      if (popup) {
        popup.document.write(`<h1>New Push Notification</h1><p>${JSON.stringify(message)}</p>`);
      } else {
        alert('Please allow popups for this site to see notifications.');
      }
    });

    // Subscribe to notification clicks
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      // Navigate to the specified URL when the notification is clicked
      if (notification?.data?.url) {
        window.open(notification.data.url, '_blank');
      }
    });


    this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe(
      (res: any) => {
        this.apiData = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }




  checkForUpdate(): void {
    this.intervalSubscription?.unsubscribe();
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.intervalSubscription = this.intervalSource.subscribe(async () => {
        try {
          this.isNewVersionAvailable = await this.swUpdate.checkForUpdate();
          if (this.isNewVersionAvailable) {
            if (confirm("New version available for update. Do you want to update?")) {
              document.location.reload();
            }
          }
          console.log(this.isNewVersionAvailable ? 'A new version is available.' : 'Already on the latest version.');
        } catch (error) {
          console.error('Failed to check for updates:', error);
        }
      });
    })
  }

  applyUpdate(): void {
    // Reload the page to update to the latest version after the new version is activated
    this.swUpdate.activateUpdate()
      .then(() => document.location.reload())
      .catch(error => console.error('Failed to apply updates:', error));
  }



  // for push notifications
  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        // Make a post call to serve
        console.log(JSON.stringify(sub));
      })
      .catch((err) => console.log(err));
  }



  // sync and IndexedDB implementation
  postSync() {
    let obj = {
      name: 'Subrat',
    };
    //api call
    this.http.post('http://localhost:4000/data', obj).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.indexedDBService
          .addUser(obj.name)
          .then(this.backgroundSync)
          .catch(console.log);
        //this.backgroundSync();
      }
    );
  }

  backgroundSync() {
    navigator.serviceWorker.ready
      .then((swRegistration:any) => swRegistration.sync.register('post-data'))
      .catch(console.log);
  }



}
