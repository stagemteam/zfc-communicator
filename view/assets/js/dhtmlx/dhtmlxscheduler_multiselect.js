/*
@license
dhtmlxScheduler v.5.0.0 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.form_blocks.multiselect={render:function(e){var t="dhx_multi_select_control dhx_multi_select_"+e.name;convertStringToBoolean(e.vertical)&&(t+=" dhx_multi_select_control_vertical");for(var a="<div class='"+t+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",i=0;i<e.options.length;i++)a+="<label><input type='checkbox' value='"+e.options[i].key+"'/>"+e.options[i].label+"</label>",convertStringToBoolean(e.vertical)&&(a+="<br/>");return a+="</div>";
},set_value:function(t,a,i,n){function r(e){for(var a=t.getElementsByTagName("input"),i=0;i<a.length;i++)a[i].checked=!!e[a[i].value]}for(var s=t.getElementsByTagName("input"),d=0;d<s.length;d++)s[d].checked=!1;var o={};if(i[n.map_to]){for(var l=(i[n.map_to]+"").split(n.delimiter||e.config.section_delimiter||","),d=0;d<l.length;d++)o[l[d]]=!0;r(o)}else{if(e._new_event||!n.script_url)return;var _=document.createElement("div");_.className="dhx_loading",_.style.cssText="position: absolute; top: 40%; left: 40%;",
t.appendChild(_);var c=[n.script_url,-1==n.script_url.indexOf("?")?"?":"&","dhx_crosslink_"+n.map_to+"="+i.id+"&uid="+e.uid()].join("");e.$ajax.get(c,function(a){for(var i=e.$ajax.xpath("//data/item",a.xmlDoc),s={},d=0;d<i.length;d++)s[i[d].getAttribute(n.map_to)]=!0;r(s),t.removeChild(_)})}},get_value:function(t,a,i){for(var n=[],r=t.getElementsByTagName("input"),s=0;s<r.length;s++)r[s].checked&&n.push(r[s].value);return n.join(i.delimiter||e.config.section_delimiter||",")},focus:function(e){}}});