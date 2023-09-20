export const grey_color = '#aeaeae';
export const red_color = '#ff5656';
export const black_color = '#000';
export const white_color = '#fff';
export const half_black = 'rgba(0, 0, 0, 0.6)';

export const blue_main = '#0095ff';
export const blue_secondary = '#d7eeff';
export const purple_main = '#9000ff';
export const purple_secondary = '#eed9ff';
export const green_main = '#64bc00';
export const green_secondary = '#e5ffc8';
export const orange_main = '#ff8400';
export const orange_secondary = '#ffdfbc';

export const secondsToHms = (d) => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? h + "时" : "";
    let mDisplay = m > 0 ? m + "分" : "";
    let sDisplay = s > 0 ? s + "秒" : "";
    return hDisplay + mDisplay + sDisplay;
}

export const blueTheme = {
    colors: {
        main: '#0095ff',
        secondary: '#d7eeff',
    }
}

export const purpleTheme = {
    colors: {
        main: '#9000ff',
        secondary: '#eed9ff',
    }
}

export const greenTheme = {
    colors: {
        main: '#64bc00',
        secondary: '#e5ffc8',
    }
}

export const orangeTheme = {
    colors: {
        main: '#ff8400',
        secondary: '#ffdfbc',
    }
}