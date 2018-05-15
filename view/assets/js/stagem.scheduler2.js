AgereCommunicator = {
	init: function() {
		scheduler.config.mark_now = true;
		scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.config.now_date = new Date();

		scheduler.config.time_step = 15;
		scheduler.config.multi_day = true;
		scheduler.locale.labels.section_subject = "Subject";
		scheduler.config.first_hour = 9;
		scheduler.config.last_hour = 19;
		scheduler.config.limit_time_select = true;
		scheduler.config.details_on_dblclick = true;
		scheduler.config.details_on_create = true;
		scheduler.config.touch = "force";
		scheduler.locale.labels.workweek_tab = "W-Week"
		scheduler.config.readonly_form = true;

		//block all modifications
		scheduler.attachEvent("onBeforeDrag",function(){return false;})
		scheduler.attachEvent("onClick",function(){return false;})
		scheduler.config.details_on_dblclick = true;
		scheduler.config.dblclick_create = false;

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

		scheduler.templates.week_date_class=function(date,today){
			if (date.getDay()==0 || date.getDay()==6)
				return "weekday";
			return "";
		};

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

		scheduler.templates.event_class=function(start, end, event){
			var css = "";

			if(event.subject) // if event has subject property then special class should be assigned
				css += "event_"+event.subject;

			if(event.id == scheduler.getState().select_id){
				css += " selected";
			}
			return css; // default return

			/*
			 Note that it is possible to create more complex checks
			 events with the same properties could have different CSS classes depending on the current view:

			 var mode = scheduler.getState().mode;
			 if(mode == "day"){
			 // custom logic here
			 }
			 else {
			 // custom logic here
			 }
			 */
		};

		var subject = [
			{ key: 'klymentev', label: 'Климентьев В.Г.'},
			{ key: 'barskyy', label: 'Барский М.Л.'},
			{ key: 'shilenko', label: 'Шиленко Д.Р.'},
			{ key: 'sabodash', label: 'Сабадош О.Р.'},
			{ key: 'yushchenko', label: 'Ющенко Л.Ф.'},
		];

		scheduler.config.lightbox.sections=[
			//{name:"description", height:43, map_to:"text", type:"textarea" , focus:true},
			{name:"Доктор", height:20, type:"select", options: subject, map_to:"subject" },
			{name:"ФИО:", height:40, map_to:"fio", type:"textarea" , focus:true},
			{name:"Диагноз", height:40, map_to:"diagnosis", type:"textarea" , focus:true},
			{name:"Анамнез", height:40, map_to:"anamnesis", type:"textarea" , focus:true},
			{name:"Лечение", height:40, map_to:"treatment", type:"textarea" , focus:true},
			{name:"Рекомендации", height:40, map_to:"recommendation", type:"textarea" , focus:true},


			/** select choose *///
			/*{name: "test1", height: 21, map_to: "test1", type: "select",
				options: subject },
			{name: "test2", height: 21, map_to: "test2", type: "select",
				options: subject },*/
			/** select choose *///


			{name:"time", height:72, type:"time", map_to:"auto" }
		];

		scheduler.init('scheduler_here', new Date(), "week");

		scheduler.setLoadMode("week");
		scheduler.load("admin/communicator/sync");
		/*scheduler.load("/assets/events.xml",function(){
			scheduler.showLightbox("1261150511");
		});*/

		var dp = new dataProcessor("admin/communicator/sync");
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
