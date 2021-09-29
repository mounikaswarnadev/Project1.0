import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
    private data: any = {};
    public items: string[] = [];
    constructor() {
    }
    put(key: string, response: any): void {
        this.data[key] = response;
    }
    get(key: string): any | undefined {
        return this.data[key];
    }
    invalidateItems() {
        this.items = [];
    }
    invalidCache(key: string) {
        this.data[key] = undefined;
    }
}
