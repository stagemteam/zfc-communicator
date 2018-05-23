AgereCommunicator = {
    init: function() {

        var sections=[
            {key:1, label:"Климентьев В.Г. (каб. 402)"},
            {key:2, label:"Барский М.Л. (каб. 401)"},
            {key:3, label:"Шиленко Д.Р. (каб. 405)"},
            {key:4, label:"Сабадош О.Р. (каб. 407)"},
            {key:5, label:"Ющенко Л.Ф. (каб. 402)"}
        ];

        scheduler.locale.labels.unit_tab = "День"
        scheduler.locale.labels.section_custom="Section";
        scheduler.config.details_on_create=true;
        scheduler.config.details_on_dblclick=true;
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.config.first_hour = 7;
        scheduler.config.last_hour = 19;
        scheduler.config.time_step = 5;
        scheduler.config.active_link_view="unit";
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

        scheduler.config.lightbox.sections=[
            {name: "ФИО", map_to: "fio", type: "textarea", height:40, filtering: true},
            {name:"Doctor", height:23, type:"select", options:sections, map_to:"doctor", subject: 'english' },
            {name:"Comment", height:80, map_to:"text2", type:"textarea" , focus:true},
            {name:"time", height:72, type:"time", map_to:"auto"}
        ];

        // or even block specific resources in our views
        scheduler.blockTime(1, [180,240,800,1000], { unit: [1,4] });
        scheduler.blockTime(2, [180,240,800,1000], { unit: [1,4] });
        scheduler.blockTime(3, [180,240,800,1000], { unit: [1,4] });
        scheduler.blockTime(4, [180,240,800,1000], { unit: [1,4] });
        scheduler.blockTime(5, [180,240,800,1000], { unit: [1,4] });
        scheduler.blockTime(6, "fullday", { unit: [1,4] });
        scheduler.blockTime(7, "fullday", { unit: [1,4] });
        /*scheduler.blockTime({
            days: 2,
            zones: [180,240,800,1000],
            sections: {
                timeline: [1,4]
            }
        });*/

        scheduler.createUnitsView({
            name:"unit",
            property:"section_id",
            list:sections,
            //days: 3
        });
        scheduler.config.multi_day = true;

        //scheduler.init('scheduler_here',new Date(2017,5,30),"unit");
        ///scheduler.load("./data/units.json", "json");


        scheduler.attachEvent("onEventSave",function(id,ev,is_new){
            /*@todo-vlad Зробити створення пацієнта  */
            createVisit(ev);


            console.log(ev);
            alert("Text too small");
            return false;
        });

        scheduler.init('scheduler_here', new Date(), "unit");

        scheduler.setLoadMode("week");
        scheduler.load("communicator/sync");
        /*scheduler.load("/assets/events.xml",function(){
            scheduler.showLightbox("1261150511");
        });*/

        var dp = new dataProcessor("communicator/sync");
        dp.init(scheduler);
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

function createVisit(data) {

    var newForm = document.createElement('form');
    newForm.setAttribute('action', '/admin/patient/create');
    newForm.setAttribute('method', 'POST');

    var input1 = document.createElement('input');
    input1.setAttribute('type', 'hidden');
    input1.setAttribute('name', 'fio');
    input1.setAttribute('value', data['fio']);

    var input2 = document.createElement('input');
    input2.setAttribute('type', 'hidden');
    input2.setAttribute('name', 'doctor');
    input2.setAttribute('value', data['fio']);

    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute("value", "Save");
    submit.setAttribute('id', 'savebutton');
    $(submit).css('display', 'none');

    newForm.appendChild(input1);
    newForm.appendChild(input2);
    newForm.appendChild(submit);
    $(document.body).append(newForm);
    $(newForm).submit();

}