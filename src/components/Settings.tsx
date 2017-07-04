/**
 * Created by Denis on 14.06.2017.
 */
import * as React from "react";
import {connect} from 'react-redux';
import {updateRefresh} from '../actions';

const Settings = ({refreshOption, updateRefresh}: any) => {
    const items = [1, 2, 5, 10, 20, 30], tableStyle = {width: '100%'};

    return <table className="table table-striped" style={tableStyle}>
            <tbody>
                <tr><td width="60%">Data refresh period:</td><td><select onChange={e => updateRefresh(+e.target.value)}>{items.map(it => <option value={it} selected={refreshOption == it}>{it} second</option>)}</select></td></tr>
            </tbody>
        </table>;
};

export default connect(({refreshOption}: any) => {
    return {refreshOption}
}, (dispatch: any) => {
    return {updateRefresh: index => dispatch(updateRefresh(index))};
})(Settings);