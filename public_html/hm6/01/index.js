function timer(time = 1000) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(time);
        },time);
    });
};

timer().then(time=>console.log(`Сработало через ${time/1000} сек.`));
timer(5000).then(time=>console.log(`Сработало через ${time/1000} сек.`));
timer(7800).then(time=>console.log(`Сработало через ${time/1000} сек.`));