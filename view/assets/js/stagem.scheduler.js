AgereCommunicator = {
	init: function() {

        var sections=[
            {key:1, label:"Климентьев В.Г. (каб. 402)"},
            {key:2, label:"Барский М.Л. (каб. 401)"},
            {key:3, label:"Шиленко Д.Р. (каб. 405)"},
            {key:4, label:"Сабадош О.Р. (каб. 407)"},
            {key:5, label:"Ющенко Л.Ф. (каб. 402)"},
        ];

        scheduler.locale.labels.unit_tab = "Unit"
        scheduler.locale.labels.section_custom="Section";
        scheduler.config.details_on_create=true;
        scheduler.config.details_on_dblclick=true;
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.config.first_hour = 9;
        scheduler.config.last_hour = 19;
        scheduler.config.time_step = 5;

        var step = 15;
        var format = scheduler.date.date_to_str("%H:%i");

        scheduler.config.hour_size_px=(60/step)*22;
        scheduler.templates.hour_scale = function(date){
            html="";
            for (var i=0; i<60/step; i++){
                html+="<div style='height:22px;line-height:22px;'>"+format(date)+"</div>";
                date = scheduler.date.add(date,step,"minute");
            }
            return html;
        }


        scheduler.attachEvent("onTemplatesReady",function(){
            //work week
            scheduler.date.workweek_start = scheduler.date.week_start;
            scheduler.templates.workweek_date = scheduler.templates.week_date;
            scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
            scheduler.date.add_workweek=function(date,inc){ return scheduler.date.add(date,inc*7,"day"); }
            scheduler.date.get_workweek_end=function(date){ return scheduler.date.add(date,5,"day"); }



            //decade
            scheduler.date.decade_start = function(date){
                var ndate = new Date(date.valueOf());
                ndate.setDate(Math.floor(date.getDate()/10)*10+1);
                return this.date_part(ndate);
            }
            scheduler.templates.decade_date = scheduler.templates.week_date;
            scheduler.templates.decade_scale_date = scheduler.templates.week_scale_date;
            scheduler.date.add_decade=function(date,inc){ return scheduler.date.add(date,inc*10,"day"); }
        });

        /*scheduler.form_blocks["my_editor"] = {
            render:function(sns) {
                return "<div class='dhx_cal_ltext'><input type='text'></div>";
            },
            set_value:function(node, value, ev) {
                node.childNodes[1].value = value || "";
                node.childNodes[4].value = ev.details || "";
            },
            get_value:function(node, ev) {
                ev.details = node.childNodes[4].value;
                return node.childNodes[1].value;
            },
            focus:function(node) {
                var a = node.childNodes[1];
                a.select();
                a.focus();
            }
        };*/

        scheduler.config.lightbox.sections=[
            {name:"name", height:130, map_to:"my_editor", type:"textarea" , focus:true},
            {name:"dsda", height:130, map_to:"text", type:"textarea" , focus:true},
            {name:"custom", height:23, type:"select", options:sections, map_to:"section_id" },
            {name:"time", height:72, type:"time", map_to:"auto"}
        ]

        scheduler.createUnitsView({
            name:"unit",
            property:"section_id",
            list:sections,
            days: 1
        });

        /*scheduler.attachEvent("onEventSave",function(id,ev,is_new){
            console.log(ev);
            alert("Text too small");
            return false;
        })*/

        scheduler.init('scheduler_here',new Date(2017,5,30),"unit");
        scheduler.load("units.xml");
	},

	show_minical: function() {
	if (scheduler.isCalendarVisible())
		scheduler.destroyCalendar();
	else
		scheduler.renderCalendar({
			position:"dhx_minical_icon",
			date:scheduler._date,
			navigation:true,
			handler:function(date,calendar){
				scheduler.setCurrentView(date);
				scheduler.destroyCalendar()
			}
		});
	},
}
jQuery(document).ready(function ($) {
	AgereCommunicator.init();
});

/*jQuery('#export_pdf').bind('click', function ($) {
	scheduler.toPDF("http://dhtmlxscheduler.appspot.com/export/pdf", "color");
})*/
