MODULE		= MyPGPSecure

# Change this to point at your Gecko SDK directory.
XULRUNNER_SDK_PATH ?= /home/dias/xulrunner-sdk

HEADERPY	       ?= $(XULRUNNER_SDK_PATH)/sdk/bin/header.py
TYPELIBPY       ?= $(XULRUNNER_SDK_PATH)/sdk/bin/typelib.py

CXX	       ?= c++ #clang++

XPIDLSRCS	= \
		iMypgp.idl \
		$(NULL)

CPPSRCS		= \
		Mypgp.cpp \
		MypgpModule.cpp \
		$(NULL)

CPPFLAGS +=     -fno-rtti		\
                -fno-exceptions		\
                -fshort-wchar		\
		          -fPIC			\
		          -std=c++11			\
		          -Os			\
		          -Wall			\
		          $(NULL)

# GCC only define which allows us to not have to #include mozilla-config
# in every .cpp file.  If your not using GCC remove this line and add
# #include "mozilla-config.h" to each of your .cpp files.
GECKO_CONFIG_INCLUDE = -include xpcom-config.h #-include mozilla-config.h

GECKO_DEFINES  = -DMOZILLA_STRICT_API

GECKO_INCLUDES = $(XULRUNNER_SDK_PATH)/idl/                            

INCLUDES = -I/home/dias/xulrunner-sdk/include/nspr -I/home/dias/xulrunner-sdk/include -I/home/dias/xulrunner-sdk/include/mozilla -L /home/dias/xulrunner-sdk/lib

GECKO_LDFLAGS =  -L$(XULRUNNER_SDK_PATH)/bin \
		 -L$(XULRUNNER_SDK_PATH)/lib \
		 -lxpcomglue_s	\
                 -lnspr4	\
                 -lplds4	\
		 -lxul		\
		 -shared	\
		 $(NULL)

%.h: %.idl
	$(HEADERPY) -I $(GECKO_INCLUDES) --cachedir=/tmp/ -o IMypgp.h  $<

%.xpt: %.idl
	$(TYPELIBPY) -I $(GECKO_INCLUDES) --cachedir=/tmp/ -o IMypgp.xpt  $<

%.o: %.cpp Makefile
	$(CXX) -c $(CPPFLAGS) $(GECKO_CONFIG_INCLUDE) $(GECKO_DEFINES) $(INCLUDES) $<

$(MODULE).so: $(XPIDLSRCS:%.idl=%.h) $(XPIDLSRCS:%.idl=%.xpt) $(CPPSRCS:%.cpp=%.o)
	$(CXX) -o $@ -Wl,-soname=$(MODULE).so $(CPPSRCS:%.cpp=%.o) $(GECKO_LDFLAGS)
	chmod +x $@

build: $(MODULE).so

install:
	cp MyPGPSecure.so ../mypgp\@ist.utl/components/
	cp IMypgp.xpt ../mypgp\@ist.utl/components/

outro:
	clang++ -std=c++11 -fPIC -Os -Wall -o Mypgp.so -include xpcom-config.h -DXPCOM_GLUE -I/home/dias/xulrunner-sdk/include/nspr -I/home/dias/xulrunner-sdk/include -I/home/dias/xulrunner-sdk/include/mozilla -L /home/dias/xulrunner-sdk/lib -lxpcomglue -lnspr4 -lplds4 -fno-rtti -fno-exceptions -shared Mypgp.cpp MypgpModule.cpp

headertype: 
	$(HEADERPY) -I $(GECKO_INCLUDES) --cachedir=/tmp/ -o IMypgp.h iMypgp.idl
	$(TYPELIBPY) -I $(GECKO_INCLUDES) --cachedir=/tmp/ -o IMypgp.xpt  iMypgp.idl

clean:
	rm $(MODULE).so
