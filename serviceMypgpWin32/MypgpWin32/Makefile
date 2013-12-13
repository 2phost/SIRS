MODULE		= MyPGPSecure

GECKO_SDK_PATH ?= $(HOME)/xulrunner-sdk

XPIDL	       ?= $(GECKO_SDK_PATH)/bin/xpidl
HEADERPY	   ?= $(GECKO_SDK_PATH)/sdk/bin/header.py
TYPELIBPY      ?= $(GECKO_SDK_PATH)/sdk/bin/typelib.py

CXX	       = g++ #clang++

XPIDLSRCS	= \
		Mypgp.idl \
		$(NULL)

CPPSRCS		= \
		Mypgp.cpp \
		MypgpModule.cpp \
		$(NULL)

CPPFLAGS +=     -fexceptions		\
                -fshort-wchar		\
		-fPIC			\
-std=c++11\
		$(NULL)

GECKO_CONFIG_INCLUDE = -include xpcom-config.h

GECKO_DEFINES  = -DMOZILLA_STRICT_API

GECKO_INCLUDES = -I$(GECKO_SDK_PATH)                    \
                 -I$(GECKO_SDK_PATH)/idl                \
                 -I$(GECKO_SDK_PATH)/include            \
                 -I$(GECKO_SDK_PATH)/include/mozilla   \
                 -I$(GECKO_SDK_PATH)/include/nspr		\
                 -I$/usr/include/cryptopp

GECKO_LDFLAGS =  -L$(GECKO_SDK_PATH)/bin \
		 -L$(GECKO_SDK_PATH)/lib \
		 -lxpcomglue_s	\
                 -lnspr4	\
                 -lplds4	\
		 -lxul		\
		 -shared	\
		-lcryptopp \
		-pthread \
		 $(NULL)

%.h: %.idl
	$(HEADERPY) $(GECKO_INCLUDES) --cachedir=/tmp/ -o IMypgp.h $<

%.xpt: %.idl
	$(TYPELIBPY) $(GECKO_INCLUDES) --cachedir=/tmp/ -o IMypgp.xpt $<

%.o: %.cpp Makefile
	$(CXX) -c $(CPPFLAGS) $(CXXFLAGS) $(GECKO_CONFIG_INCLUDE) $(GECKO_DEFINES) $(GECKO_INCLUDES) $<

$(MODULE).so: $(XPIDLSRCS:%.idl=%.h) $(XPIDLSRCS:%.idl=%.xpt) $(CPPSRCS:%.cpp=%.o)
	$(CXX) -o $@ -Wl,-rpath-link,$(GECKO_SDK_PATH)/bin,-soname=$(MODULE).so $(CPPSRCS:%.cpp=%.o) $(GECKO_LDFLAGS)
	chmod +x $@

build: $(MODULE).so

teste:
	$(HEADERPY) $(GECKO_INCLUDES) --cachedir=/tmp/ -o IMypgp.h Mypgp.idl

install:
	cp MyPGPSecure.so ../../mypgp\@ist.utl/components/
	cp IMypgp.xpt ../../mypgp\@ist.utl/components/

clean:
	rm $(MODULE).so
	rm IMypgp.xpt
	rm IMypgp.h
	rm MypgpModule.o
	rm Mypgp.o
