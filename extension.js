const St = imports.gi.St;
const Main = imports.ui.main;
const GnomeDesktop = imports.gi.GnomeDesktop;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const Clipboard = St.Clipboard.get_default();
const CLIPBOARD_TYPE = St.ClipboardType.CLIPBOARD;
let text, button, label, btn;
let clock, clock_signal_id;

function init() {
    clock = new GnomeDesktop.WallClock();
    button = new St.Button({
        style_class: 'panel-button',
        reactive: true,
        can_focus: false,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });
    label = new St.Label({
        style_class: 'unixtime',
        text: '',
        opacity: 200,
        x_expand: true
    });
    button.set_child(label);
    button.connect("clicked", function(){
        Clipboard.set_text(CLIPBOARD_TYPE,  label.get_text()+"000");
    });

    button2 = new St.Button({
        style_class: 'panel-button',
        reactive: true,
        can_focus: false,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });
    label2 = new St.Label({
        style_class: 'unixtime',
        text: 'Andrea.Fresco.76adb6@test.com',
        opacity: 200,
        x_expand: true
    });
    button2.set_child(label2);
    button2.connect("clicked", function(){
        Clipboard.set_text(CLIPBOARD_TYPE,  label2.get_text());
    });
}

function enable() {
    update_time();
    clock_signal_id = clock.connect('notify::clock', Lang.bind(this, this.update_time));
    Main.panel._centerBox.insert_child_at_index(button, 1);
    Main.panel._centerBox.insert_child_at_index(button2, 2);
}

function disable() {
    Main.panel._centerBox.remove_child(button);
    clock.disconnect(clock_signal_id);
}

function update_time() {
    var now = new Date();
    label.set_text(Math.round(now.getTime() / 1000).toString());
}
