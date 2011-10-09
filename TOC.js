var TOC=new Class({initialize:function(elem){this.toc=$(elem);if(!this.toc){return};this.createToc();},createToc:function(){var out='<ul>';var nodes=this.getElementsByTagNamess('h2,h3,h4,h5');var weight,oldweight,nextweight;nodes.each(function(o,k){var id=o.id;if(id==''){id='head'+k;o.id=id;}
weight=o.nodeName.substr(1,1);if(k>0&&weight>oldweight){out+='<ul>';}
out+='<li><a href="#'+o.id+'">'+o.innerHTML+'</a>';if(nodes[k+1]){nextweight=nodes[k+1].nodeName.substr(1,1);if(weight>nextweight){out+='</li></ul></li>';}
if(weight==nextweight){out+='</li>';}}
oldweight=weight;});out+='</li></ul>';this.toc.set('html',this.toc.get('html')+out);},getElementsByTagNamess:function(list,obj){if(!obj)var obj=document;var tagNames=list.split(',');var resultArray=new Array();for(var i=0;i<tagNames.length;i++){var tags=obj.getElementsByTagName(tagNames[i]);for(var j=0;j<tags.length;j++){resultArray.push(tags[j]);}}
var testNode=resultArray[0];if(!testNode)return[];if(testNode.sourceIndex){resultArray.sort(function(a,b){return a.sourceIndex-b.sourceIndex;});}
else if(testNode.compareDocumentPosition){resultArray.sort(function(a,b){return 3-(a.compareDocumentPosition(b)&6);});}
return resultArray;}});
