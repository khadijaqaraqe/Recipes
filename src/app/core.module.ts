import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";
import { RecipeService } from "./reciepes/recipe.service";

@NgModule({
    providers: [
        
        RecipeService,
        {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
        },
        LoggingService
    ]
})
export class CoreModule {}