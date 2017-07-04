/**
 * Created by Denis on 14.06.2017.
 */
import * as React from "react";
import Settings from './Settings';
import Symbols from './Symbols';
import Rates from './Rates';

export default (props: any) => {
    return <main>
        <section className="settings"><h3>Settings</h3><Settings /></section>
        <section className="symbols"><h3>Symbols</h3><Symbols /></section>
        <section className="rates"><h3>Rates</h3><Rates /></section>
    </main>;
}