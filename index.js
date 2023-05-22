import { Observable, Subject, map } from 'rxjs';

const test = new Observable(myObservableFunction);

function myObservableFunction(observer){
    const value = Math.random();
    if (value <= 1/3.0)
        {
            observer.next(value);
            observer.next(value + 1);
            observer.error("ca sarrete la");
            observer.next("pas de chance");
    
         }
    else if (value <= 2/3.0)
         observer.error("Value <= 2/3 (error)");
    else
        throw "Value > 2/3 (throw)";
         observer.complete();

}



// si je subscribe 2 fois directement sur mon observable
// , j'aurai 2 fois des données différentes car cela refera un Math.random() à chaque subscribe


// exemple sans modifier les données avant de les recevoir
test.subscribe({
    next : (data) => {console.log(data)},
    error : (error) => {console.log(error)},
    complete : () => {}
});


// exemple en modifiant mes donnée avant de les recevoir

test.pipe(map((x) => "j'ajoute ce texte à chaque donnée " + x)).subscribe({
    next : (data) => {console.log(data)},
    error : (error) => {console.log(error)},
    complete : () => {}
});


// si je subscribe 2 fois mon observable en passant d'abord par un Subject, j'aurai 2 fois le même résultat

const sub = new Subject();

sub.subscribe({
    next : (data) => {console.log(data)},
    error : (error) => {console.log(error)},
    complete : () => {}
});

sub.subscribe({
    next : (data) => {console.log(data)},
    error : (error) => {console.log(error)},
    complete : () => {}
});

test.subscribe(sub);